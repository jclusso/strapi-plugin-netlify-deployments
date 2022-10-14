import React, { useEffect, useState } from 'react';
import getSites from "../../utils/getSites";
import getDefaultSite from "../../utils/getDefaultSite";
import { Select, Option } from '@strapi/design-system/Select';
import getTranslation from '../../utils/getTranslation';

const SitePicker = ({ handleSiteSelect }) => {
  const [sites, setSites] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    getSites().then((sites) => setSites(sites));
    getDefaultSite().then(site => { setSelectedId(site.id)});
  }, []);

  if (sites.length === 1) return null;
  if (!selectedId) return null;

  const handleClick = (value) => {
    if (value === selectedId) return;

    setSelectedId(value)
    const selectedSite = sites.find(site => site.id == value)
    handleSiteSelect(selectedSite)
  };

  return (
    <Select
      size="S"
      aria-label={getTranslation('actions.select-site')}
      value={selectedId}
      onChange={handleClick}
    >
      {sites.map((site) => (
        <Option key={site.id} value={site.id}>
          {site.name}
        </Option>
      ))}
    </Select>
  );
};

export default SitePicker;
