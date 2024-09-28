"use client"
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog"
import Image from "next/image"
import { FallbackSignature } from "@/components/signature-card"
import SignatureCanvas from "react-signature-canvas"
import { Button } from "@/components/ui/button"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

interface AddSignatureDialogProps {
    signature?: string
    setSignature: (signature: string | undefined) => void
}

export default function AddSignatureDialog({
    signature,
    setSignature,
}: AddSignatureDialogProps) {
    const signaturePad = useRef<SignatureCanvas>(null)
    const parent = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [isError, setIsError] = useState(false)

    function handleAddSignature() {
        if (signaturePad.current?.isEmpty()) {
            return setIsError(true)
        }

        setIsError(false)
        const signature = signaturePad.current?.toDataURL()
        setSignature(signature)
        setOpen(false)
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            if (!parent.current || !signaturePad.current) return

            const canvas = signaturePad.current.getCanvas()
            canvas.width = parent.current?.clientWidth || 300
        }, 0)
    }, [open])

    useEffect(() => {
        const handleResize = () => {
            if (!signaturePad.current || !parent.current) {
                return
            }
            signaturePad.current.clear()
            const canvas = signaturePad.current.getCanvas()
            canvas.width = parent.current?.clientWidth || 300
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button>
                    {signature ? (
                        <Image
                            src={signature}
                            alt="signature"
                            width={64}
                            height={47}
                            className="h-[47px] w-[64px] object-cover"
                        />
                    ) : (
                        <FallbackSignature>توقيع</FallbackSignature>
                    )}
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle dir="rtl">التوقيع</DialogTitle>
                </DialogHeader>
                <div
                    ref={parent}
                    className=" flex justify-center overflow-hidden rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                >
                    <SignatureCanvas
                        ref={signaturePad}
                        penColor="black"
                        canvasProps={{
                            height: 200,
                        }}
                    />
                </div>
                {isError && (
                    <p className="text-sm font-medium text-destructive text-start">
                        يجب عليك تحديد التوقيع المطلوب
                    </p>
                )}
                <div className="pt-6 flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleAddSignature} className="w-full">
                        إضافة التوقيع
                    </Button>
                    <Button
                        onClick={() => signaturePad.current?.clear()}
                        className="w-full"
                    >
                        مسح التوقيع
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
