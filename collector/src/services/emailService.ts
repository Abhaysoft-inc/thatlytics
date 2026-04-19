import { transporter } from "../config/mailingService.js";

export function sendEmail(receipent: string, body: string): void {

    console.log("email sent", body, receipent);


}