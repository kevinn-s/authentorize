/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ReactNode } from "react";
   import {
        useQuery,
        useMutation,
        useQueryClient,
        QueryClient,
        QueryClientProvider,
      } from '@tanstack/react-query'

export default function Provider({children} : {children : ReactNode}){
         // Create a client
      const queryClient = new QueryClient()
     
        return (
          // Provide the client to your App
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        )
      
}