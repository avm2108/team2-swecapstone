export const isObjectNotEmpty = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        if (value === null || value === undefined || value === '') {
          return false;
        }
  
        if (typeof value === 'object' && !Array.isArray(value)) {
          if (!isObjectNotEmpty(value)) {
            return false;
          }
        }
      }
    }
    return true;
  }