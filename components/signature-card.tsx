import { cn } from "@/lib/utils"

interface SignatureProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Signature(props: SignatureProps) {
    return (
        <div
            className={cn("flex flex-col gap-6 items-center", props.className)}
        >
            {props.children}
        </div>
    )
}

interface SignatureHeadingProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignatureHeading(props: SignatureHeadingProps) {
    return <h3 className="text-lg font-medium">{props.children}</h3>
}

interface FallbackSignatureProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FallbackSignature(props: FallbackSignatureProps) {
    return (
        <h3 className="text-xs font-semibold text-gray-600 h-[50px] flex items-center">
            {props.children}
        </h3>
    )
}
