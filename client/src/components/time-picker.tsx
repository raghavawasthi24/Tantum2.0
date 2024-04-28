
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input className="py-2 px-4 w-full" id="time" type="time" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
