export const UtilFunctions = {
  objectToFormData<T extends Record<string, unknown>>(obj: T): FormData {
    const formData = new FormData();

    function buildFormData(data: unknown, parentKey?: string) {
      if (data === null || data === undefined) {
        return;
      }

      if (Array.isArray(data)) {
        data.forEach((element) => {
          const key = parentKey ? `${parentKey}[]` : '[]';
          buildFormData(element, key);
        });
      } else if (data instanceof File || data instanceof Blob) {
        if (parentKey) {
          formData.append(parentKey, data, (data as File).name || 'blob');
        }
      } else if (typeof data === 'object' && !(data instanceof Date)) {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = (data as Record<string, unknown>)[key];

            const newParentKey = parentKey ? `${parentKey}[${key}]` : key;
            buildFormData(value, newParentKey);
          }
        }
      } else {
        const value = data instanceof Date ? data.toISOString() : data;

        if (parentKey) {
          formData.append(parentKey, String(value));
        }
      }
    }

    buildFormData(obj);

    return formData;
  },

  setFormErrors(
    serverErrors: Record<string, string[]>
  ): Array<{ name: string; message: string }> {
    if (!Array.isArray(serverErrors)) {
      return [];
    } else
      return Object.entries(serverErrors)
        .filter(
          ([key, messages]) => Array.isArray(messages) && messages.length > 0
        )
        .map(([name, messages]) => ({
          name,
          message: messages[0]!,
        }));
  },
};
