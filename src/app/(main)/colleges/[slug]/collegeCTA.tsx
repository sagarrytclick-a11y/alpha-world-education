'use client'

import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { useFormModal } from "@/context/FormModalContext"

export default function CollegeCTA() {
  const { openModal } = useFormModal()

  return (
    <>
      <Button onClick={openModal}>Contact Advisor</Button>
      <Button onClick={openModal} variant="outline">
        Request Information
      </Button>
    </>
  )
}
