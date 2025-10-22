"use client";
import { useDialogManager } from "@/hook/dialog";
import React, { createContext, useEffect, useState } from "react";

export const ContextMain = createContext<any>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dialog = useDialogManager();
  const [user, setUser] = useState<any>(null);
  const [crypto, setcrypto] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  // const [csrfToken, setCsrfToken] = useState<string | null>(null);
  // const [state, setstate] = useState<any>({
  //   groups: [
  //     {
  //       id: "",
  //       name: "",
  //       description: "",
  //       created_at: "",
  //       created_by: { id: "", name: "" },
  //       member_count: 0,
  //       visibility: "PRIVATE",
  //       cover_image: "",
  //       members: [
  //         {
  //           id: "",
  //           userEmail: "",
  //           groupId: "",
  //           role: "",
  //           // user: {
  //           //   id: "",
  //           //   email: "",
  //           //   name: "",
  //           //   avatar: "",
  //           //   verified: false,
  //           //   createdAt: "",
  //           // },
  //         },
  //       ],
  //       columns: [
  //         {
  //           id: "",
  //           name: "",
  //           order: 0,
  //           group_id: "",
  //           // tasks: [
  //           //   {
  //           //     id: "",
  //           //     title: "",
  //           //     description: "",
  //           //     assigned_to: null,
  //           //     assigned_to_id: null,
  //           //     column_id: "",
  //           //     due_date: "",
  //           //     priority: "MEDIUM",
  //           //     created_at: "",
  //           //     updated_at: "",
  //           //     task_labels: [
  //           //       {
  //           //         id: "",
  //           //         task_id: "",
  //           //         label_id: "",
  //           //         task: null,
  //           //         label: null,
  //           //       },
  //           //     ],
  //           //     comments: [
  //           //       {
  //           //         id: "",
  //           //         author: null,
  //           //         author_id: "",
  //           //         task_id: "",
  //           //         text: "",
  //           //         created_at: "",
  //           //       },
  //           //     ],
  //           //     activity: [
  //           //       {
  //           //         id: "",
  //           //         action: "CREATED",
  //           //         by: null,
  //           //         by_id: "",
  //           //         task_id: null,
  //           //         from_column: "",
  //           //         to_column: "",
  //           //         timestamp: "",
  //           //       },
  //           //     ],
  //           //   },
  //           // ],
  //         },
  //       ],
  //       tasks: [
  //         {
  //           id: "",
  //           title: "",
  //           description: "",
  //           assigned_to: null,
  //           assigned_to_id: null,
  //           column_id: "",
  //           due_date: "",
  //           priority: "MEDIUM",
  //           created_at: "",
  //           updated_at: "",
  //           task_labels: [
  //             {
  //               id: "",
  //               task_id: "",
  //               label_id: "",
  //               task: null,
  //               label: null,
  //             },
  //           ],
  //           // comments: [
  //           //   {
  //           //     id: "",
  //           //     author: null,
  //           //     author_id: "",
  //           //     task_id: "",
  //           //     text: "",
  //           //     created_at: "",
  //           //   },
  //           // ],
  //           activity: [
  //             {
  //               id: "",
  //               action: "CREATED",
  //               by: null,
  //               by_id: "",
  //               task_id: null,
  //               from_column: "",
  //               to_column: "",
  //               timestamp: "",
  //             },
  //           ],
  //           comments: [
  //             {
  //               id: "",
  //               author: null,
  //               author_id: "",
  //               task_id: "",
  //               text: "",
  //               created_at: "",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // });
  



  

    async function getData() {
    
    // try {
    //   const res = await fetch("/api/getdata", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(
    //       await crypto[0]({
    //         table: "group",
    //         where: {
    //           members: {
    //             some: {
    //               userEmail: user?.email,
    //             },
    //           },
    //         },
    //         include: {
    //           created_by: true, // اطلاعات سازنده گروه
    //           members: {
    //             include: { user: true },
    //           },
    //         },
    //       })
    //     ),
    //   });
    //   const json = await res.json();
    //   setdata(json)
    //   // console.log('dasdddddd:',ui);
      
    //   // setData(json.data); // ذخیره توی state
    // } catch (err) {
    //   console.error("خطا در گرفتن داده:", err);
    // }
  }



  // useEffect(() => {
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await axios.get("/api/csrf");
  //       setCsrfToken(response.data.csrfToken);
  //     } catch (error) {
  //       console.error("Failed to fetch CSRF token:", error);
  //     }
  //   };
  //   fetchCsrfToken();
  // }, []);


  useEffect(() => {
    const fetchVerify = async () => {
      // try {
      //   const res = await fetch("/api/getverify");
      //   if (!res.ok) throw new Error("Failed to fetch verify data");
      //   const data = await res.json();
      //   setUser(data.payload);
      // } catch (err) {
      //   console.error("Error fetching verify:", err);
      // }
    };
    getData()
    fetchVerify();
  }, []);

  return (
    <ContextMain.Provider
      value={{ ...dialog, user, setcrypto, crypto, data, setdata }}
    >
      {children}
    </ContextMain.Provider>
  );
};
