
import OMRProcessingComponent from "@/components/omrProcessingComponent/omrprocessing";
import { Metadata } from "next";
import Script from "next/script";
import { categoryApi } from "services/getApi.service";

export const metadata: Metadata = {
  title: "OMRProcessing",
};

const OMRProcessing = async () => {

  // const img = await cv.imreadAsync('/0004.jpg');
  // const gray = img.bgrToGray();
  // const threshold = gray.threshold(120, 255, cv.THRESH_BINARY);
  // const contours = threshold.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
  // console.log(contours);

  const omrData = await categoryApi();
  return (
    <>
      {/* <Script src="https://docs.opencv.org/4.5.3/opencv.js" strategy="beforeInteractive" /> */}

      {/* <Script src="/opencv.js" strategy="beforeInteractive" /> */}
      <OMRProcessingComponent omrData={omrData}/>
    </>
  );
};

export default OMRProcessing;
