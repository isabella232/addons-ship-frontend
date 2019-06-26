import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  Flex,
  Text,
  PlacementManager,
  PlacementReference,
  Icon,
  Placement,
  DropdownMenu,
  DropdownMenuItem
} from '@bitrise/bitkit';
import cx from 'classnames';

import css from './style.scss';

type Props = {
  items: Array<{
    key: string;
    value: string;
    isMarked: boolean;
  }>;
  selected: string;
  onSelect: (key: string) => void;
};

export default ({ items: originalItems, selected, onSelect }: Props) => {
  const dropdownButtonWidth = 40;
  const container = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const [hasOwerflow, setHasOwerflow] = useState(false);
  const [items, setItems] = useState(
    originalItems.map(item => ({
      ...item,
      ref: useRef(null),
      isVisible: false
    }))
  );

  useLayoutEffect(() => {
    const { right: containerRight } = (container as any).current.getBoundingClientRect();

    setItems(items =>
      items.map((item, index) => {
        const { right } = (item.ref as any).current.getBoundingClientRect();

        return { ...item, ...originalItems[index], isVisible: containerRight - dropdownButtonWidth > right };
      })
    );

    setHasOwerflow(() => items.some(({ isVisible }) => !isVisible));
  }, [originalItems, selected]);

  return (
    <Flex direction="horizontal" className={css.container} innerRef={container} alignChildrenVertical="middle">
      <Flex direction="horizontal" style={{ flex: 1, overflow: 'hidden' }}>
        <Flex direction="horizontal" className={css.list}>
          {items.map(({ key, value, isMarked, ref, isVisible }) => (
            <Text
              key={key}
              className={cx(css.item, {
                [css.itemSelected]: key === selected,
                [css.itemHidden]: !isVisible,
                [css.itemMarked]: isMarked
              })}
              weight="medium"
              size="x3"
              color="grape-4"
              onClick={() => onSelect(key)}
            >
              <span ref={ref}>{value}</span>
            </Text>
          ))}
        </Flex>
      </Flex>
      {hasOwerflow && (
        <PlacementManager>
          <PlacementReference>
            {({ ref }) => (
              <div className={css.dropdown} ref={ref} onClick={() => setOpen(isOpen => !isOpen)}>
                <Icon name="ChevronDown" />
              </div>
            )}
          </PlacementReference>
          <Placement onClose={() => setOpen(false)} visible={isOpen} placement="bottom-end">
            {() => (
              <DropdownMenu maxHeight="16rem" width="12rem">
                {items
                  .filter(({ isVisible }) => !isVisible)
                  .map(({ key, value }) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => onSelect(key)}
                      className="nope"
                      paddingHorizontal="x0"
                      selected={key === selected}
                    >
                      {value}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenu>
            )}
          </Placement>
        </PlacementManager>
      )}
    </Flex>
  );
};
