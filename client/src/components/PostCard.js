import React, { Component } from "react";
import {
  Button,
  Card,
  Dimmer,
  Icon,
  Image,
  Input,
  Popup,
} from "semantic-ui-react";
import moment from "moment";
import PlaceholderImage from "../images/placeholder.png";
import AvatarIcon from "../images/avatar.png";
import { Link } from "react-router-dom";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.showDimmer = this.showDimmer.bind(this);
    this.hideDimmer = this.hideDimmer.bind(this);
  }

  showDimmer = () => this.setState({ active: true });
  hideDimmer = () => this.setState({ active: false });

  render() {
    let {
      id,
      createdAt,
      author: {
        name: { firstname },
        username,
      },
      likeCount,
      commentCount,
    } = this.props.post;
    const timestamp = parseInt(createdAt);
    return (
      <Card fluid style={{ marginBottom: "30px" }}>
        <Card.Content>
          <Card.Meta className="right floated">
            <Popup
              trigger={<span>{moment(timestamp).fromNow()}</span>}
              content={moment(timestamp).format("Do MMM YYYY [at] h:mm:ss A")}
              size="mini"
              position="top center"
              inverted
            />
          </Card.Meta>
          <Link to={`/@${username}`} style={{ color: "black" }}>
            <Image avatar src={AvatarIcon} />
            {firstname}
          </Link>
        </Card.Content>
        <Dimmer.Dimmable className="image" blurring dimmed={this.state.active}>
          <Dimmer active={this.state.active} onMouseLeave={this.hideDimmer}>
            <Card.Content>
              <div className="center">
                <Button as={Link} inverted to={`/posts/${id}`}>
                  Read Post
                </Button>
              </div>
            </Card.Content>
          </Dimmer>
          <div className="image" onMouseEnter={this.showDimmer}>
            <Image src={PlaceholderImage} />
          </div>
        </Dimmer.Dimmable>
        <Card.Content>
          <span className="right floated">
            <Icon name="heart outline" />
            {likeCount} likes
          </span>
          <Icon name="comments outline" /> {commentCount} comments
        </Card.Content>
        <Card.Content extra>
          <Input
            icon="heart outline"
            iconPosition="left"
            transparent
            size="large"
            placeholder="Add comment"
          />
        </Card.Content>
      </Card>
    );
  }
}
