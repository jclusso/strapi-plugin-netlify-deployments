import { useIntl } from 'react-intl';
import getTrad from "./getTrad";

const getTranslation = (key, defaultMessage = '') => {
  const { formatMessage } = useIntl();
  return formatMessage({ id: getTrad(key), defaultMessage: defaultMessage })
};

export default getTranslation;
