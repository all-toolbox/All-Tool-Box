import * as stylex from '@stylexjs/stylex';

// import PlusSVG from '@assets/plus.svg?react';
// import HorizontalEllipsisSVG from '@assets/horizontal-ellipsis.svg?react';
// import SearchSVG from '@assets/search.svg?react';

import {useState} from "react";

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: 'var(--sidebar-search-height)',
    borderBottom: '0.0625rem solid var(--sidebar-border)',
    paddingHorizontal: '0.25rem',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2rem',
    width: '2rem',
    fill: 'var(--color-sidebar-text)',
    color: 'var(--color-sidebar-text)',
    ':hover': {
      fill: 'var(--color-white)',
      color: 'var(--color-white)'
    }
  },
  searchContainer: {
    height: '1.25rem',
    borderRadius: '0.125rem',
    border: '0.0625rem solid var(--sidebar-border)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0.125rem',
    flex: 1,
  },
  input: {
    height: '0.875rem',
    padding: 0,
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: '0.875rem',
    color: 'var(--color-sidebar-text)',
    paddingLeft: '0.125rem',
    borderRadius: 0,
    flex: 1,
    '::placeholder': {
      color: 'var(--color-placeholder)'
    }
  }
})

interface SidebarSearchRowProps {

}

export function SidebarSearchRow({

}: SidebarSearchRowProps) {

  const [query, setQuery] = useState<string>("")

  return (
    <div {...stylex.props(styles.container)}>
      {/* <div {...stylex.props(styles.searchContainer)}>
        <SearchSVG height={12} width={12}/>
        <input {...stylex.props(styles.input)} placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query}/>
      </div>
      <button {...stylex.props(styles.button)}>
        <PlusSVG height={16} width={16}/>
      </button>
      <button {...stylex.props(styles.button)}>
        <HorizontalEllipsisSVG height={16} width={16}/>
      </button> */}
    </div>
  )
}
