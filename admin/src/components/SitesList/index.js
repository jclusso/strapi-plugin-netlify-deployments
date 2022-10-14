/**
 *
 * SitesList
 *
 */

import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Badge } from "@strapi/design-system/Badge";

import FormattedMessage from "../FormattedMessage";

/**
 * Displays the table with the sites
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SitesList = ({ sites }) => {
  const ROW_COUNT = sites.length + 1;
  const COL_COUNT = 5;

  const headerFontVariant = "sigma";
  const cellTextColor = "neutral800";

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
      <Thead>
        <Tr>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="sites-list.table-header.name"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="sites-list.table-header.id"
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {sites.map((site) => (
          <Tr key={site.id}>
            <Td>
              <Typography textColor={cellTextColor}>{site.name}</Typography>
            </Td>
            <Td>
              <Badge
                textColor="neutral100"
                backgroundColor={cellTextColor}
              >
                {site.id}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SitesList;
