import html from 'fake-tag';

import { app } from 'src/config';
import header from './shared/header.template';

interface RenderProps {
  email: string;
  passwordToken: string;
}

export default function render({ email, passwordToken }: RenderProps) {
  const url = `${app.websiteURL}/login?step=reset_password&email=${email}&password_token=${passwordToken}`;

  return html`
    <mjml>
      ${header}

      <mj-body background-color="#F7F9FA">
        <mj-section>
          <mj-column>
            <mj-image
              padding="0"
              padding-top="10px"
              padding-left="36px"
              padding-bottom="10px"
              align="left"
              width="50"
              src="https://poolpoolpool.s3.eu-west-3.amazonaws.com/email/icon-512.png"
            ></mj-image>
          </mj-column>
        </mj-section>

        <mj-section
          css-class="card-shadow"
          background-color="#ffffff"
          border-radius="4px"
          padding-top="36px"
          padding-bottom="48px"
          padding-left="36px"
          padding-right="36px"
        >
          <mj-column padding="0">
            <mj-text
              font-size="28px"
              line-height="34px"
              color="#CE99FF"
              font-weight="600"
            >
              Need to reset your password?
            </mj-text>

            <mj-button href="${url}" css-class="purple-btn">
              Reset password
            </mj-button>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;
}
