
"use client";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import CryptoJS from "crypto-js";
import { useState, useEffect, useCallback } from "react";

interface PageResponse<T> {
  items: T[];
  nextCursor?: string | null;
}

export function useLoadingData<T = any>(
  type: string,
  mutateEndpoint: string,
  body: any = {},
  limit: number = 1
) {
  // console.log('test::',type,mutateEndpoint,body,limit);
  
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const queryKey = ["data", type, limit, debouncedSearch];

  const query = useInfiniteQuery<any>({
    queryKey,
    refetchOnReconnect: true,
    retryDelay: (failureCount: number, error: unknown) => {
      // exponential backoff: 1s, 2s, 4s... capped at 30s
      const base = 1000;
      return Math.min(base * 2 ** Math.max(0, failureCount - 1), 30000);
    },
    
    select: useCallback((data: any) => {
      return data?.pages.flatMap((p: any) => p?.items ?? p) ?? [];
    }, []),
    
    queryFn: async ({ pageParam }: any) => {
      const cursor = pageParam?.nextCursor ?? null;

      const res = await fetch(
        `/api/${type}${body?`/${body}`:""}?limit=${limit}${
          cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""
        }${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
        {
          method: Object.keys(body).length ? "POST" : "GET",
          body: Object.keys(body).length ? JSON.stringify(body) : undefined,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
    // getNextPageParam: (lastPage) =>
    //   lastPage?.nextCursor ? { nextCursor: lastPage.nextCursor } : undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.nextCursor) {
        return { nextCursor: lastPage.nextCursor };
      }
      return undefined; // 👈 دقیقاً این مهمه!
    },
    initialPageParam: null,
  });

  const mutation = useMutation({
    mutationFn: async ({
      method,
      body,
    }: {
      method: "POST" | "PUT" | "DELETE";
      body: any;
    }) => {
      const SECRET_KEY = "adminacceldev";
      const dataString = JSON.stringify(body);
      const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();

      const res = await fetch(`/api/${mutateEndpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encrypted),
      });

      if (!res.ok) throw new Error("Mutation failed");
      return await res.json();
    },
    onMutate: async (data: any) => {
      console.log(data);

      await queryClient.cancelQueries({ queryKey });
    },
    onSettled(data, error, variables, onMutateResult, context) {
      console.log(data, error, variables);
    },
    onSuccess: () => {
      console.log("success");
      query.refetch();
      queryClient
        .invalidateQueries({ queryKey: ["data"] })
        .then(() => {
          console.log("suc");
        })
        .catch(() => {
          console.log("err");
        });
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey:queryKey });
    // },
  });

  return {
    query,
    mutation,
    queryKey,
    search,
    setSearch,
  };
}
