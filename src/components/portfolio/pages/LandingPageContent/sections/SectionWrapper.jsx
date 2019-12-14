import React, { useEffect } from "react";
import { updateStateByKey } from "utils/state-helpers";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import { useCurrentUser } from "api/UserContext";

export function SectionWrapper(props) {
  const { section } = props;
  const { DB_PAGE_ROOT, component } = section;
  const database = firebase.database();

  const { isAdmin } = useCurrentUser();

  const [sectionContent, setSectionContent] = React.useState({});
  const { files, ...otherContent } = sectionContent;
  const [fileURLs, setFileURLs] = React.useState({});
  const updateFileURLs = (key, value) =>
    updateStateByKey(key, value, setFileURLs);

  useEffect(() => {
    if (files) {
      Object.keys(files).forEach(async fileKey => {
        const storageRef = firebase.storage().ref(DB_PAGE_ROOT);
        const url = await storageRef.child(files[fileKey]).getDownloadURL();
        updateFileURLs(fileKey, url);
      });
    }
  }, [files, DB_PAGE_ROOT]);

  useEffect(() => {
    database.ref(DB_PAGE_ROOT).on("value", snapshot => {
      setSectionContent(snapshot.val() || {});
    });
    return () => {
      database.ref(DB_PAGE_ROOT).off("value");
    };
  }, [database, DB_PAGE_ROOT]);

  const handleEdit = (key, value) => {
    database.ref(DB_PAGE_ROOT).update({ [key]: value });
  };

  const handlePush = key => {
    let index = 0;
    if (sectionContent && sectionContent[key]) {
      index = Object.values(sectionContent[key]).length;
    }
    database.ref(DB_PAGE_ROOT + "/" + key).push({ index: index });
  };

  const handleFileUpload = (file, dbKey) => {
    let storageRef = firebase.storage().ref();
    let dbRef = storageRef.child(DB_PAGE_ROOT + "/" + file.name);
    dbRef.put(file).then(snapshot => {
      database.ref(DB_PAGE_ROOT).update({
        ["files/" + dbKey]: file.name
      });
    });
  };

  return (
    <>
      {React.createElement(component, {
        fileURLs,
        content: otherContent,
        handleEdit,
        handleFileUpload,
        isAdmin,
        handlePush
      })}
    </>
  );
}
