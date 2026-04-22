import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { LOGIN_CONTENT, REGISTER_CONTENT } from "../constants/content";

interface AuthCardWrapperProps {
  children: React.ReactNode;
}

function AuthCardWrapper({ children }: AuthCardWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname.endsWith("/login");
  const content = isLoginPage ? LOGIN_CONTENT : REGISTER_CONTENT;

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-4 py-8">
      <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-100">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {content.title}
          </h1>
        </div>

        <Card className="border-border/50 bg-card/50 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4 text-center">
            <CardTitle className="text-xl font-semibold">
              {content.subTitle}
            </CardTitle>
            <CardDescription>{content.description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AuthCardWrapper;
