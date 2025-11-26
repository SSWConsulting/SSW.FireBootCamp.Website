import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { FbcHero } from "./fbc-hero";
import { FbcSkills } from "./fbc-skills";
import { FbcVideo } from "./fbc-video";
import { FbcTabs } from "./fbc-tabs";
import { FbcCertification } from "./fbc-certification";
import { FbcPricing } from "./fbc-pricing";
import { FbcTestimonialSlider } from "./fbc-testimonial-slider";
import { FbcTeam } from "./fbc-team";
import { FbcFaq } from "./fbc-faq";
import { FbcCtaBanner } from "./fbc-cta-banner";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksFbcHero":
      return <FbcHero data={block} />;
    case "PageBlocksFbcSkills":
      return <FbcSkills data={block} />;
    case "PageBlocksFbcVideo":
      return <FbcVideo data={block} />;
    case "PageBlocksFbcTabs":
      return <FbcTabs data={block} />;
    case "PageBlocksFbcCertification":
      return <FbcCertification data={block} />;
    case "PageBlocksFbcPricing":
      return <FbcPricing data={block} />;
    case "PageBlocksFbcTestimonialSlider":
      return <FbcTestimonialSlider data={block} />;
    case "PageBlocksFbcTeam":
      return <FbcTeam data={block} />;
    case "PageBlocksFbcFaq":
      return <FbcFaq data={block} />;
    case "PageBlocksFbcCtaBanner":
      return <FbcCtaBanner data={block} />;
    default:
      return null;
  }
};
