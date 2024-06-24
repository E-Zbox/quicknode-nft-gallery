"use client";
import Image from "next/image";
// styles
import {
  FloatingCard,
  MainFooter,
  PoweredTitle,
  SocialIcons,
} from "../styles/Footer.styles";
// utils
import { screens } from "@/utils/data";
import { FlexContainer } from "../styles/shared/Container.styles";

const Footer = () => {
  const {
    footer: {
      assets: { quicknodeIcon },
      socials,
    },
  } = screens;
  return (
    <MainFooter>
      {socials.map(({ icon, link }, key) => (
        <FloatingCard key={key}>
          <SocialIcons
            $bgImg={icon.src}
            href={link}
            target="_blank"
          ></SocialIcons>
        </FloatingCard>
      ))}
      <FloatingCard>
        <FlexContainer
          $flexDirection="row"
          $alignItems="center"
          $padding={"10px 15px 10px 20px"}
        >
          <PoweredTitle>Powered by</PoweredTitle>
          <Image src={quicknodeIcon} height={40} width={40} alt="" />
        </FlexContainer>
      </FloatingCard>
    </MainFooter>
  );
};

export default Footer;
