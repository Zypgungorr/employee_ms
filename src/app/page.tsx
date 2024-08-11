"use client"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
    const router = useRouter()
    const {user} = useUser()
    
    if(!user){
        return router.replace("/login")
    }
  return router.replace("/add-record")
}
