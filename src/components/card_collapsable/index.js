import React from 'react';

import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import CardCollapsableHeader from '../card_collapsable_header';

export default function CardCollapsable(props) {

  const {
    title,
    isCollapsed,
    content,
    onPress,
    card,
    check
  } = props

  return (
    <Collapse
      isCollapsed={isCollapsed}
    >
      <CollapseHeader>
        <CardCollapsableHeader
          card={card}
          check={check}
          isCollapsed={isCollapsed}
          title={title}
          onPress={onPress}
        />
      </CollapseHeader>
      <CollapseBody>
        {content}
      </CollapseBody>
    </Collapse>
  );
}

CardCollapsable.defaulProps = {
  title: '',
}