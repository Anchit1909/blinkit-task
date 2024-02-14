import { FunctionComponent } from "react";
import { IFile } from "../../../types";
import { sizeInMB } from "@/lib/sizeInMB";
import { File } from "lucide-react";

const RenderFile: FunctionComponent<{ file: IFile }> = ({
  file: { format, sizeInBytes, name },
}) => {
  return (
    <div className="flex items-center justify-between w-full px-4 -mt-24">
      <div className="flex items-center justify-center">
        <File />
        <span className="max-w-sm mx-2 text-base font-default">{name}</span>
      </div>
      <span className="ml-auto text-base font-default">
        {sizeInMB(sizeInBytes)}
      </span>
    </div>
  );
};

export default RenderFile;
