import {useEffect, useState} from 'react';
import {getDocuments} from '../utils/firebaseFunctions';

export function useGetFamilyList() {
  const [familyList, setFamilyList] = useState<any>([]);

  useEffect(() => {
    const init = async () => {
      const response = await getDocuments({collectionName: 'family_members'});
      if (!Array.isArray(response)) {
        return;
      }
      setFamilyList(response);
    };
    init();
  }, []);

  return {familyList};
}
