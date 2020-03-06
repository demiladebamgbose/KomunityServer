/**
 * Created by demiladebamgbose on 16/10/2017.
 */
/**
 * Created by demiladebamgbose on 12/09/2017.
 */
export default function resetTemplate(email) {
    return  "<!DOCTYPE html>\n" +
        "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
        "<head>\n" +
        "	<meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n" +
        "	<meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n" +
        "	<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n" +
        "    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n" +
        "	<title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n" +
        "\n" +
        "	<!-- Web Font / @font-face : BEGIN -->\n" +
        "	<!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->\n" +
        "	\n" +
        "	<!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->\n" +
        "	<!--[if mso]>\n" +
        "		<style>\n" +
        "			* {\n" +
        "				font-family: sans-serif !important;\n" +
        "			}\n" +
        "		</style>\n" +
        "	<![endif]-->\n" +
        "	\n" +
        "	<!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->\n" +
        "	<!--[if !mso]><!-->\n" +
        "		<!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->\n" +
        "	<!--<![endif]-->\n" +
        "\n" +
        "	<!-- Web Font / @font-face : END -->\n" +
        "	\n" +
        "	<!-- CSS Reset -->\n" +
        "    <style>\n" +
        "\n" +
        "		/* What it does: Remove spaces around the email design added by some email clients. */\n" +
        "		/* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n" +
        "        html,\n" +
        "        body {\n" +
        "	        margin: 0 auto !important;\n" +
        "            padding: 0 !important;\n" +
        "            height: 100% !important;\n" +
        "            width: 100% !important;\n" +
        "        }\n" +
        "        \n" +
        "        /* What it does: Stops email clients resizing small text. */\n" +
        "        * {\n" +
        "            -ms-text-size-adjust: 100%;\n" +
        "            -webkit-text-size-adjust: 100%;\n" +
        "        }\n" +
        "        \n" +
        "        /* What is does: Centers email on Android 4.4 */\n" +
        "        div[style*=\"margin: 16px 0\"] {\n" +
        "            margin:0 !important;\n" +
        "        }\n" +
        "        \n" +
        "        /* What it does: Stops Outlook from adding extra spacing to tables. */\n" +
        "        table,\n" +
        "        td {\n" +
        "            mso-table-lspace: 0pt !important;\n" +
        "            mso-table-rspace: 0pt !important;\n" +
        "        }\n" +
        "                \n" +
        "        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n" +
        "        table {\n" +
        "            border-spacing: 0 !important;\n" +
        "            border-collapse: collapse !important;\n" +
        "            table-layout: fixed !important;\n" +
        "            margin: 0 auto !important;\n" +
        "        }\n" +
        "        table table table {\n" +
        "            table-layout: auto; \n" +
        "        }\n" +
        "        \n" +
        "        /* What it does: Uses a better rendering method when resizing images in IE. */\n" +
        "        img {\n" +
        "            -ms-interpolation-mode:bicubic;\n" +
        "        }\n" +
        "        \n" +
        "        /* What it does: A work-around for iOS meddling in triggered links. */\n" +
        "        .mobile-link--footer a,\n" +
        "        a[x-apple-data-detectors] {\n" +
        "            color:inherit !important;\n" +
        "            text-decoration: underline !important;\n" +
        "        }\n" +
        "\n" +
        "        /* What it does: Prevents underlining the button text in Windows 10 */\n" +
        "        .button-link {\n" +
        "            text-decoration: none !important;\n" +
        "        }\n" +
        "      \n" +
        "    </style>\n" +
        "    \n" +
        "    <!-- Progressive Enhancements -->\n" +
        "    <style>\n" +
        "        \n" +
        "        /* What it does: Hover styles for buttons */\n" +
        "        .button-td,\n" +
        "        .button-a {\n" +
        "            transition: all 100ms ease-in;\n" +
        "        }\n" +
        "        .button-td:hover,\n" +
        "        .button-a:hover {\n" +
        "            background: #555555 !important;\n" +
        "            border-color: #555555 !important;\n" +
        "        }\n" +
        "\n" +
        "        /* Media Queries */\n" +
        "        @media screen and (max-width: 600px) {\n" +
        "\n" +
        "            .email-container {\n" +
        "                width: 100% !important;\n" +
        "                margin: auto !important;\n" +
        "            }\n" +
        "\n" +
        "            /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */\n" +
        "            .fluid {\n" +
        "                max-width: 100% !important;\n" +
        "                height: auto !important;\n" +
        "                margin-left: auto !important;\n" +
        "                margin-right: auto !important;\n" +
        "            }\n" +
        "\n" +
        "            /* What it does: Forces table cells into full-width rows. */\n" +
        "            .stack-column,\n" +
        "            .stack-column-center {\n" +
        "                display: block !important;\n" +
        "                width: 100% !important;\n" +
        "                max-width: 100% !important;\n" +
        "                direction: ltr !important;\n" +
        "            }\n" +
        "            /* And center justify these ones. */\n" +
        "            .stack-column-center {\n" +
        "                text-align: center !important;\n" +
        "            }\n" +
        "        \n" +
        "            /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */\n" +
        "            .center-on-narrow {\n" +
        "                text-align: center !important;\n" +
        "                display: block !important;\n" +
        "                margin-left: auto !important;\n" +
        "                margin-right: auto !important;\n" +
        "                float: none !important;\n" +
        "            }\n" +
        "            table.center-on-narrow {\n" +
        "                display: inline-block !important;\n" +
        "            }\n" +
        "                \n" +
        "        }\n" +
        "\n" +
        "    </style>\n" +
        "\n" +
        "</head>\n" +
        "<body width=\"100%\" bgcolor=\"#222222\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n" +
        "    <center style=\"width: 100%; background: #224;\">\n" +
        "\n" +
        "        <!-- Visually Hidden Preheader Text : BEGIN -->\n" +
        "        <div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n" +
        "            (Optional) This text will appear in the inbox preview, but not the email body.\n" +
        "        </div>\n" +
        "        <!-- Visually Hidden Preheader Text : END -->\n" +
        "\n" +
        "        <!-- Email Header : BEGIN -->\n" +
        "        <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"600\" style=\"margin: auto;\" class=\"email-container\">\n" +
        "			<tr>\n" +
        "				<td style=\"padding: 20px 0; text-align: center\">\n" +
        "					<img src=\"http://res.cloudinary.com/dd58mfinr/image/upload/v1506351371/authenticase_h10mdg.jpg\" width=\"200\" height=\"50\" alt=\"alt_text\" border=\"0\" style=\"height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n" +
        "				</td>\n" +
        "			</tr>\n" +
        "        </table>\n" +
        "        <!-- Email Header : END -->\n" +
        "        \n" +
        "        <!-- Email Body : BEGIN -->\n" +
        "        <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"600\" style=\"margin: auto;\" class=\"email-container\">\n" +
        "            \n" +
        "            <!-- Hero Image, Flush : BEGIN -->\n" +
        "            <tr>\n" +
        "				<td bgcolor=\"#ffffff\">\n" +
        "					<img src=\"http://placehold.it/600x300\" width=\"600\" height=\"300\" alt=\"alt_text\" border=\"0\" align=\"center\" class=\"fluid\" style=\"width: 100%; max-width: 600px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n" +
        "				</td>\n" +
        "            </tr>\n" +
        "            <!-- Hero Image, Flush : END -->\n" +
        "\n" +
        "            <!-- 1 Column Text : BEGIN -->\n" +
        "            <tr>\n" +
        "                <td bgcolor=\"#ffffff\" style=\"padding: 40px; text-align: center; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n" +
        "                 Please follow the link to verify your account.\n" +
        "                    <br><br>\n" +
        "                    <!-- Button : Begin -->\n" +
        "                    <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" style=\"margin: auto\">\n" +
        "                        <tr>\n" +
        "                            <td style=\"border-radius: 3px; background: #222222; text-align: center;\" class=\"button-td\">\n" +
        "                                <a href=\"https://authenticaseapp.herokuapp.com/verify/"+email+"\" style=\"background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;\" class=\"button-a\">\n" +
        "                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#ffffff;\">Reset</span>&nbsp;&nbsp;&nbsp;&nbsp;\n" +
        "                                </a>\n" +
        "                            </td>\n" +
        "                        </tr>\n" +
        "                    </table>\n" +
        "                    <!-- Button : END -->\n" +
        "                </td>\n" +
        "            </tr>\n" +
        "            <!-- 1 Column Text : BEGIN -->\n" +
        "\n" +
        "            <!-- Background Image with Text : BEGIN -->\n" +
        "            <tr>\n" +
        "                <!-- Bulletproof Background Images c/o https://backgrounds.cm -->\n" +
        "                <td background=\"http://placehold.it/600x230/222222/666666\" bgcolor=\"#222222\" valign=\"middle\" style=\"text-align: center; background-position: center center !important; background-size: cover !important;\">\n" +
        "\n" +
        "                    <!--[if gte mso 9]>\n" +
        "                    <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;height:175px; background-position: center center !important;\">\n" +
        "                    <v:fill type=\"tile\" src=\"http://placehold.it/600x230/222222/666666\" color=\"#222222\" />\n" +
        "                    <v:textbox inset=\"0,0,0,0\">\n" +
        "                    <![endif]-->\n" +
        "                    <div>\n" +
        "                        <table role=\"presentation\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
        "                            <tr>\n" +
        "                                <td valign=\"middle\" style=\"text-align: center; padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;\">\n" +
        "                                    You can reset your password by following the above link.\n" +
        "                                </td>\n" +
        "                            </tr>\n" +
        "                        </table>\n" +
        "                        </div>\n" +
        "                    <!--[if gte mso 9]>\n" +
        "                    </v:textbox>\n" +
        "                    </v:rect>\n" +
        "                    <![endif]-->\n" +
        "                </td>\n" +
        "            </tr>\n" +
        "            <!-- Background Image with Text : END -->\n" +
        "           \n" +
        "            <!-- 2 Even Columns : BEGIN -->\n" +
        "           " +
        "\n" +
        "            <!-- Clear Spacer : BEGIN -->\n" +
        "            <tr>\n" +
        "                <td height=\"40\" style=\"font-size: 0; line-height: 0;\">\n" +
        "                    &nbsp;\n" +
        "                </td>\n" +
        "            </tr>\n" +
        "            <!-- Clear Spacer : END -->\n" +
        "\n" +
        "            <!-- 1 Column Text + Button : BEGIN -->\n" +
        "\n" +
        "        </table>\n" +
        "        <!-- Email Body : END -->\n" +
        "          \n" +
        "        <!-- Email Footer : BEGIN -->\n" +
        "        <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"600\" style=\"margin: auto;\" class=\"email-container\">\n" +
        "            <tr>\n" +
        "                <td style=\"padding: 40px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\">\n" +
        "                    <webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\">View as a Web Page</webversion>\n" +
        "                    <br><br>\n" +
        "                    AUthenticase<br><span class=\"mobile-link--footer\">123 Fake Street, SpringField, OR, 97477 US</span><br><span class=\"mobile-link--footer\">(123) 456-7890</span>\n" +
        "                    <br><br> \n" +
        "                    <unsubscribe style=\"color:#888888; text-decoration:underline;\">unsubscribe</unsubscribe>\n" +
        "                </td>\n" +
        "            </tr>\n" +
        "        </table>\n" +
        "        <!-- Email Footer : END -->\n" +
        "\n" +
        "    </center>\n" +
        "</body>\n" +
        "</html>";
}