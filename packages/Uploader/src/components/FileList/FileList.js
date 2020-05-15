import React from "react";
import PropTypes from "prop-types";
import useI18n from "@paprika/l10n/lib/useI18n";
import { UploaderContext } from "../../Uploader";
import { getNumberWithUnits } from "../../helpers";
import File from "../File";

const propTypes = {
  maxFileSize: PropTypes.number.isRequired,
  supportedMimeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const defaultProps = {};

export default function FileList({ supportedMimeTypes, maxFileSize }) {
  const { files } = React.useContext(UploaderContext);
  const I18n = useI18n();

  function getFileErrorText(file) {
    if (!file.isSizeValid) {
      return I18n.t("uploader.errors.size", { maxFileSize: getNumberWithUnits(maxFileSize) });
    }

    if (!file.isTypeValid) {
      return I18n.t("uploader.errors.type", { supportedTypes: supportedMimeTypes.join(", ") });
    }

    if (!file.isServerValid) {
      return file.error.message;
    }

    return null;
  }

  return (
    files &&
    files.map(file => (
      <File
        fileKey={file.key}
        key={file.key}
        name={file.filename}
        size={file.filesize}
        status={file.status}
        progress={file.progress}
        error={getFileErrorText(file)}
      />
    ))
  );
}

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;
