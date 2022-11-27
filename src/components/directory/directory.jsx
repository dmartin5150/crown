import {DirectoryContainer} from "./directory.styles";
import DirectoryItem from "../directory-item/directory-item";




const Directory = ({categories}) => {
  return (
    <DirectoryContainer>
      {categories.map((category) => {
        const { id } = category;
        return <DirectoryItem key={id} category={category} />;
      })}
    </DirectoryContainer>
  );
};
export default Directory;
