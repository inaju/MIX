import type { NextApiRequest, NextApiResponse } from "next";
import { NotionMagicLinkEmail } from "../../emails/index";
import { resend } from "../../lib/resend";
import { NextResponse } from "next/server";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req) {
    const { firstname, email } = JSON.parse(req?.body);
    console.log(firstname, email, "firstname, email");
    const data = await resend.sendEmail({
      from: "mitchel@mitchelinaju.com",
      to: email,
      subject: "MIX Bootcamp",
      react: NotionMagicLinkEmail({
        firstName: firstname,
        whatsappGroupLink: "https://chat.whatsapp.com/EEplj71Rtd31HRNGk2mS5Y",
      }),
    });

    console.log(res.status(200).send(data), "res.status(200).send(data)");

    return NextResponse.json({ status: "OK" });
  }
  // return res.status(200).send(data);
};

export default POST;
