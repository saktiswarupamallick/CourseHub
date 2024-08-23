import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, CircleAlert} from "lucide-react";

interface AlertBannerProps {
  isCompleted: boolean;
  requiredFieldsCount: number;
  missingFieldsCount: number;
}

const AlertBanner = ({
  isCompleted,
  requiredFieldsCount,
  missingFieldsCount,
}: AlertBannerProps) => {
  return (
    <Alert
      className="my-4"
      variant={`${isCompleted ? "complete" : "destructive"}`}
    >
      {isCompleted ? (
        <Rocket className="h-4 w-4" />
      ) : (
        <CircleAlert className="h-4 w-4" />
      )}
      <AlertTitle className="text-xs font-medium">
        {missingFieldsCount} {missingFieldsCount === 1 ? "field is" : "fields are"} missing
      </AlertTitle>
      <AlertDescription className="text-xs">
        {isCompleted
          ? "Everything looks good! You are ready to proceed."
          : "Please fill out all required fields before proceeding."}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
