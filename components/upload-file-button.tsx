"use client"
import { useRef } from "react"
import { Button } from "./ui/button"
import { FilePlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadFileButtonProps extends React.ComponentProps<typeof Button> {
    disabled?: boolean
    onFileChange: (file: File) => void
}
export const UploadFileButton = ({ onFileChange, children,...props }: UploadFileButtonProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <Button  {...props} onClick={() => {
            inputRef.current?.click()
        }}>
            {children}

            <input type="file" className="hidden" ref={inputRef} onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                    onFileChange(file)
                }
            }} />
        </Button>
    )
}