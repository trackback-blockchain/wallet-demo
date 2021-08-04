/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DocumentsProps, Document } from 'types';

import { ReactComponent as Passsport } from '../resources/passport.svg';


function Documents(props: DocumentsProps) {
    const { documents = [] } = props;

    if (documents.length === 0) {
        return (
            <div css={css`  
       
            height: 78px;

            background: #FFFFFF;
            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.06);
            border-radius: 8px;

            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 128%;
            text-align:center;
            padding:30px;
        `}
            >You haven’t linked any documents yet.</div>
        )
    }


    return (
        <>
            {documents.map((d: Document) => {
                return (
                    <div key={d.id} css={css`
                    background: #FFFFFF;
                    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.06);
                    border-radius: 8px;
                    height: 94px;
                    display:flex;
                    padding:24px;

                 `}>

                        <div css={css``}>
                            <Passsport width="46" height="46" />

                        </div>

                        <div css={css`
                        margin-left:18px;
                        text-align: left;
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                        
                        `}>


                            <div css={css`
                            font-style: normal;
                            font-weight: bold;
                            font-size: 16px;
                            line-height: 150%;                            
                            color: #333333;
                            
                            
                            `}>{d.title}</div>

                            <div css={css`
                            font-weight: 600;
                            font-size: 9px;
                            line-height: 12px;
                            display: flex;
                            align-items: center;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            color: #828282;
                                
                            
                            `}>{d.subTitle}</div>
                        </div>

                    </div>
                )
            })}
        </>
    )

}


export default Documents;