import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { FooterExpandedData } from '@src/store/footer_expanded_atom';

function FooterHelp(props: any) {
    const FooterExpandedVal = useRecoilValue(FooterExpandedData);

    return (
        <>
            {FooterExpandedVal && createPortal(
                <>{props.children}</>,
                // @ts-ignore
                document.getElementById('footer-content')
            )}
        </>
    );
}

export default FooterHelp;
