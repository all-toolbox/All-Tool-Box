import { FooterExpandedData } from '@src/store/footer_expanded_atom';
import * as stylex from '@stylexjs/stylex';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

const styles = stylex.create({
  container: {
    width: "100%",
    display: 'flex',
    flex: 1,
  },

  text: {
    color: 'var(--color-sidebar-text)',
    fontSize: '0.625rem',
    lineHeight: '1rem',
    textAlign: 'center',
    margin: 0,
    textWrap: 'nowrap',
  },
})

interface MiddleContentProps {
  isExpanded: boolean;
}

export function MiddleContent({ isExpanded }: MiddleContentProps) {
  const setFooterExpandedAtom = useSetRecoilState(FooterExpandedData);

  const [footerExpandedAtom, setfooterExpandedAtom] = useRecoilState(FooterExpandedData);

  useEffect(() => {
    // console.log(isExpanded);
    setFooterExpandedAtom(isExpanded);

    return () => {
      setFooterExpandedAtom(false);
    }
  }, [isExpanded, setFooterExpandedAtom]);

  return (
    <div {...stylex.props(styles.container)}>
      {isExpanded &&
        <>
          {/* TODO: move this ID to a global constant instead of writing this out raw */}
          <div id="footer-content"
            style={{
              width: "100%",
            }}
          />
        </>
      }
    </div>
  );
}
