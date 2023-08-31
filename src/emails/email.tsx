import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

interface IEmail {
  firstName: string;
  product: string;
}

export function Email(props:IEmail) {
  return (
    <Html lang="en">
      <Button href={"www.google.com"}>Click me</Button>
    </Html>
  );
}

export default Email;
