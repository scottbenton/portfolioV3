import React, {FunctionComponent, useEffect} from 'react';
import { SECTION_CONFIG_SECTION } from 'sections';
import firebase from 'firebase/app';

import {APP_SETTINGS} from 'config/app-settings';

 type SectionWrapperProps = {
  isEditing: boolean;
  section: SECTION_CONFIG_SECTION;
};

type changesType = {
  [key: string]: any
}

export const SectionWrapper:FunctionComponent<SectionWrapperProps> = props => {
  const {section, isEditing} = props;
  const {component, dbKey} = section;
  
  const [data, setData] = React.useState();
  const [changes, setChanges] = React.useState<changesType>({});

  const dbRoot = APP_SETTINGS.dbRoot;
  const pageRoot = dbRoot + '/' + dbKey;

  useEffect(() => {
    const handleSnapshot = (snapshot: any) => {
      setData(snapshot.val());
    }

    firebase.database().ref(pageRoot).on("value", handleSnapshot);

    return () => {
      firebase.database().ref(pageRoot).off("value", handleSnapshot);
    }
  }, [pageRoot]);

  useEffect(() => {
    if(!isEditing && Object.keys(changes).length > 0) {
      firebase.database().ref(pageRoot).update(changes).then(() => {
        console.debug("Changes Saved.");
        setChanges({});
      });
    }
  }, [isEditing, changes, pageRoot]);

  const updateData = (key: string, value: any) => {
    setChanges(prevChanges => {
      let newChanges = {...prevChanges};
      newChanges[key] = value;
      return newChanges;
    });
  };

  const uploadFile = (file: File, callback: () => void) => {
    firebase.storage().ref(pageRoot).child(file.name).put(file).then(callback);
  };

  const getFileURL = React.useCallback(async (fileKey: string) => {
    if(fileKey){
      return await firebase.storage().ref(pageRoot).child(fileKey).getDownloadURL();
    } else {
      return "";
    }
  }, [pageRoot]);

  const dataWithChanges = Object.assign({}, data, changes);

  return (
    <div> 
      {React.createElement(component, {isEditing, data: dataWithChanges, updateData, uploadFile, getFileURL})}
    </div>
  );
}