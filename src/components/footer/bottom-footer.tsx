import * as stylex from '@stylexjs/stylex';
import {FooterButton} from "./components/footer-button.tsx";
// @ts-ignore
import BinSVG from '../../assets/bin.svg?react';
// @ts-ignore
import ConstructBotSVG from '../../assets/construct-bot.svg?react';
// @ts-ignore
import CookieSVG from '../../assets/cookie.svg?react';
// @ts-ignore
import HelpSVG from '../../assets/help.svg?react';
// @ts-ignore
import LayoutSVG from '../../assets/layout.svg?react';
// @ts-ignore
import LiveSVG from '../../assets/live.svg?react';
// @ts-ignore
import PlaySVG from '../../assets/play.svg?react';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '0.5rem',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: '0.5rem',
    height: '1rem',
    maxHeight: '1rem',
  }
})

interface BottomFooterProps {
  isExpanded: boolean;
}

// @ts-ignore
export function BottomFooter(props: BottomFooterProps) {
  return (
    <div {...stylex.props(styles.container)}>
      <FooterButton Svg={ConstructBotSVG} text='Construct Bot'/>
      <FooterButton Svg={CookieSVG} text='Cookies'/>
      <FooterButton Svg={LiveSVG} text='Start Proxy'/>
      <FooterButton Svg={PlaySVG} text='Runner'/>
      <FooterButton Svg={BinSVG} text='Trash'/>
      <FooterButton Svg={LayoutSVG}/>
      <FooterButton Svg={HelpSVG}/>
    </div>
  );
}
