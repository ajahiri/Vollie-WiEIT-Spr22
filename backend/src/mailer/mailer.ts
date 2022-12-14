import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { Logger } from "tslog";
import {
    EMAIL_ACCESS_TOKEN,
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_REFRESH_TOKEN,
    EMAIL_USER,
    SITE_NAME,
} from "../constants";
import { generateOTPForUser } from "../otps/otpManager";

const logger = new Logger({ name: "mailer" });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: EMAIL_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: EMAIL_REFRESH_TOKEN,
        accessToken: EMAIL_ACCESS_TOKEN,
    },
});

export async function sendOTPEmail(userFirstName: string, userEmail: string): Promise<void> {
    const userOTP = generateOTPForUser(userEmail);
    logger.debug(`OTP for '${userEmail}': ${userOTP}`);
    const content = `Hey ${userFirstName},\n\nHere's the one time password you requested:\n${userOTP}`;
    return await sendEmail(`Your ${SITE_NAME} One Time Password`, content, userEmail);
}

interface IShift {
    name: string;
    startTime: string; // should probs be a raw date that we format in the email
    endTime: string;
    location: string;
}
export async function sendSignedUpShiftEmail(userFirstName: string, userEmail: string, shift: IShift): Promise<void> {
    logger.debug(`Sending shift signup email for '${userEmail}' for shift ''${shift.name}`);
    const content =
        `Hey ${userFirstName},\n\n` +
        `You've signed up for the shift '${shift.name}' at ${shift.location} from ${shift.startTime} to ${shift.endTime}. See you there!`;
    return await sendEmail(`Your ${SITE_NAME} Shift Details`, content, userEmail);
}
export async function sendCancelledShiftEmail(userFirstName: string, userEmail: string, shift: IShift): Promise<void> {
    logger.debug(`Sending shift cancelled email for '${userEmail}' for shift ''${shift.name}`);
    const content = `Hey ${userFirstName},\n\nYour shift '${shift.name}' at ${shift.startTime} at ${shift.location} was cancelled.`;
    return await sendEmail(`Your ${SITE_NAME} Shift Has Been Cancelled`, content, userEmail);
}

/** Send an email with the provided parameters.
 * @param subject The subject / title of the email
 * @param content The content / body of the email (can be pure string or HTML as string)
 * @param toEmail Can be a single address (string) or multiple (string array)
 * @param ccEmail Can be a single address (string) or multiple (string array)
 * @param isHTML If the content variable is meant to be treated as HTML or not */
async function sendEmail(
    subject: string,
    content: string,
    toEmail: string | string[],
    ccEmail: string | string[] = "",
    isHTML = false
): Promise<void> {
    // check if the addresses are just string (which means they're a single address)
    // else, do a join on the string array to make into a string :)
    const toEmails = typeof toEmail === "string" ? toEmail : toEmail.join(", ");
    const ccEmails = typeof ccEmail === "string" ? ccEmail : ccEmail.join(", ");
    const options: MailOptions = {
        from: EMAIL_USER,
        to: toEmails,
        cc: ccEmails,
        subject,
        // Only set either text or html, but not both
        text: !isHTML ? content : undefined,
        html: isHTML ? content : undefined,
    };

    try {
        const sentMessageInfo = await transporter.sendMail(options);
        // TODO: Re-enable error logging!
        if (sentMessageInfo.rejected) {
            // logger.error(`Email to '${toEmails}' was rejected...`);
        }
    } catch (error: unknown) {
        logger.error(error);
    }
}
