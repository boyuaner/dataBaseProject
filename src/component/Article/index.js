import React from "react"
import { Typography } from "antd"
const { Title, Paragraph,Button } = Typography;
class Article extends React.Component {
    state = {
        title:"this is a title",
        content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt diam elit, quis mattis eros scelerisque vitae. Donec id erat et erat consequat aliquam eget ac velit. Integer efficitur purus quam, a convallis mauris ultricies at. Donec tellus nisi, congue ut ante dapibus, accumsan iaculis felis. Donec suscipit, felis at vulputate feugiat, mauris elit ullamcorper augue, tempor bibendum quam quam sed lacus. Cras interdum orci non mi accumsan dictum. Nunc accumsan est at lorem pretium dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis interdum tellus non tempus. Aenean fermentum sodales odio, et bibendum ante imperdiet quis. Etiam volutpat hendrerit lobortis. Phasellus accumsan, nulla scelerisque condimentum suscipit, nulla sapien dapibus sapien, eget ultricies dolor magna nec ligula. Pellentesque cursus, risus sit amet vulputate sagittis, sapien ante scelerisque justo, in elementum ligula metus non nulla. Nunc sit amet eleifend elit, id facilisis odio. In at ornare elit. Curabitur vel libero consectetur tortor ultrices pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt diam elit, quis mattis eros scelerisque vitae. Donec id erat et erat consequat aliquam eget ac velit. Integer efficitur purus quam, a convallis mauris ultricies at. Donec tellus nisi, congue ut ante dapibus, accumsan iaculis felis. Donec suscipit, felis at vulputate feugiat, mauris elit ullamcorper augue, tempor bibendum quam quam sed lacus. Cras interdum orci non mi accumsan dictum. Nunc accumsan est at lorem pretium dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis interdum tellus non tempus. Aenean fermentum sodales odio, et bibendum ante imperdiet quis. Etiam volutpat hendrerit lobortis. Phasellus accumsan, nulla scelerisque condimentum suscipit, nulla sapien dapibus sapien, eget ultricies dolor magna nec ligula. Pellentesque cursus, risus sit amet vulputate sagittis, sapien ante scelerisque justo, in elementum ligula metus non nulla. Nunc sit amet eleifend elit, id facilisis odio. In at ornare elit. Curabitur vel libero consectetur tortor ultrices pellentesque.",
      };
    render() {
        return (
            <Typography style={{ background: '#fff', padding: 24, minHeight:400 }}>
                <Title>
                    {this.state.title}
                </Title>
                <Paragraph>
                    {this.state.content}
                </Paragraph>
                <a>参加</a>
            </Typography>
        );
    }
}
export default Article;