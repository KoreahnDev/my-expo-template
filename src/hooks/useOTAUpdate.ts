import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export const useOTAUpdate = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkForUpdate = async () => {
    if (__DEV__) return; // 개발 환경에서는 체크 안함

    try {
      setIsChecking(true);
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setIsUpdateAvailable(true);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error("OTA update error:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkForUpdate();
  }, []);

  return { isUpdateAvailable, isChecking, checkForUpdate };
};
