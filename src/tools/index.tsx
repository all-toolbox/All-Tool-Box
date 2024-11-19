import Fuse from 'fuse.js'

import * as stylex from "@stylexjs/stylex";

import CardLink from "@src/components/commons/card-block";

import jwtLogo from "@assets/svgs/jwt.svg";
import hashLogo from "@assets/svgs/hash.svg";
import textLogo from "@assets/svgs/text-convert.svg";
import uuidIcon from "@assets/uuid.png";

import { styles } from "./styles";

import { tools, tools_mapped } from "@src/tool_list";
import { useRecoilValue } from "recoil";
import { SearchStringData } from "@src/store/search_string_atom";
import { useEffect, useState } from 'react';

const options = {
  // includeScore: true,
  // useExtendedSearch: true,
  threshold: 0.3,
  includeMatches: true,
  keys: ['tool']
};

const fuse = new Fuse(tools_mapped, options);

function Tools() {
  const getSearchString = useRecoilValue(SearchStringData);

  const [items, setItems] = useState([]);

  useEffect(() => {
    UpdateState();
  }, [getSearchString]);

  function UpdateState() {
    // console.log("here", Object.entries(tools));

    if (getSearchString !== "") {
      if (getSearchString.charAt(0) === "#") {
        // Tag search
        const search_string = getSearchString.substring(1, getSearchString.length);
        if(search_string === "") return;

        const arr = [];
        let found = false;
        // console.log(tool.tags);
        // console.log("Tw", mapped);

        for (let j = 0; j < tools_mapped.length; ++j) {
          for (let i = 0; i < tools_mapped[j].tool[1].tags.length; ++i) {
            console.log(search_string, tools_mapped[j].tool[1].tags[i]);
            if (search_string.toLowerCase() === tools_mapped[j].tool[1].tags[i].toLowerCase()) {
              found = true;
              arr.push({
                item: tools_mapped[j]
              });
              break;
            }
          }
        }

        // @ts-ignore
        setItems(arr);
      } else {
        // Search normal
        // console.log(fuse.search(getSearchString));
        // @ts-ignore
        setItems(fuse.search(getSearchString));
      }
    }

    //  else {
    //   // Empty All Items
    //   setItems(fuse.search(getSearchString));
    // }
  }

  return (
    <div {...stylex.props(styles.selector_wrap)}>
      {(getSearchString !== "") && (
        <>
          {Object.entries(items).map((tool, tidx: number) => {
            // console.log(tool);
            // @ts-ignore
            const item = tool[1].item.tool[1];

            return (
              <CardLink
                key={`${tidx}-${item.title}`}
                id={item.id}
                title={item.title}
                link={item.link}
                description={item.description}
                tags={item.tags}
              /* Icon={
              <img
                src={textLogo}
                className="svg-filter"
                style={{
                  // filter: "grayscale(1)",
                  width: "2rem",
                  height: "2rem",
                }}
                alt=""
              />
            } */
              />
            );
          })}
        </>
      )}

      {getSearchString === "" && (
        <>
          {Object.entries(tools).map((tool, tidx: number) => {
            return (
              <CardLink
                key={`${tidx}-${tool[1].title}`}
                id={tool[1].id}
                title={tool[1].title}
                link={tool[1].link}
                description={tool[1].description}
                tags={tool[1].tags}
              /* Icon={
              <img
                src={textLogo}
                className="svg-filter"
                style={{
                  // filter: "grayscale(1)",
                  width: "2rem",
                  height: "2rem",
                }}
                alt=""
              />
            } */
              />
            );
          })}
        </>
      )}

    </div>
  );
}

export default Tools;
