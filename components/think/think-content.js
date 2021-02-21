import React, { Component } from 'react';
import { Skeleton, Card, Icon, Avatar } from 'antd';
import ReactMarkdown from 'react-markdown';
import { LikeOutlined } from '@ant-design/icons';
import IconKnowMe from '../icon/icon-know-me';
import CodeBlock from '../tools/code-block';
import ImageBlock from '../tools/image-block';
const { Meta } = Card;


class ThinkContent extends Component{
    render(){
        return (
        <Card
            style={{ marginTop: 16 }}
            actions={[<IconKnowMe type="iconcomment" />, <LikeOutlined />]}
          >
            <Skeleton loading={this.props.loading} avatar active >
               <Meta
                avatar={
                  <Avatar src="/static/media/head_photo.9062f33c.png" />
                }
                title={this.props.element.ts}
                description={<ReactMarkdown className="markdown" 
                source={this.props.element.content} 
                escapeHtml={false} 
                renderers={{ code: CodeBlock,image:ImageBlock }}/>}
              /> 
            </Skeleton>
          </Card>);
    }
}

export default ThinkContent;