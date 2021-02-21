import React, { Component } from 'react';
import { Skeleton, Card } from 'antd';
import { withRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../../components/tools/code-block';
import ImageBlock from '../../../components/tools/image-block';
import KnowMeLayout from '../../../components/layout';

class ArticleDetail extends Component{
    state = {
        data:{}
      };
    componentDidMount(){

    };
    render(){
      if (this.props.router.isFallback) {
        return <Card style={{ marginTop: 16,overflow:'hidden'}}>
            <div>Loading......I'm sorry for the wait!!</div>;
        </Card>
      }
      return (<KnowMeLayout>
          <Card style={{ marginTop: 16,overflow:'hidden'}}>
              <Skeleton active loading={this.state.loading} style={{height:'800px'}} title={{width:330}} paragraph={{rows:22,width:220}}>
                  <div>
                      <h1 style={{lineHeight:"40px",fontSize:"30px"}}>{this.state.data.name}</h1>
                      <h4 style={{color:"rgb(158, 171, 179)"}}>{this.state.data.ts}</h4>
                      <hr/>
                      <p>
                      <ReactMarkdown className="markdown" 
                          source={this.props.posts.data.content} 
                          escapeHtml={false} 
                          renderers={{ code: CodeBlock,image:ImageBlock }}/>
                      </p>
                  </div>
              </Skeleton>
          </Card>
      </KnowMeLayout>);
    }
}
export default withRouter(ArticleDetail);

export async function getStaticProps({params }) {
    const res = await fetch("http://192.168.131.26:8080/api/document/findById?id="+params.id);
    const posts = await res.json();
    return {
      props: {posts},
      revalidate: 1, // In seconds
    }
  }
  export async function getStaticPaths() {
    const res = await fetch("http://192.168.131.26:8080/api/document/findByPageAndType?type=ARTICLE&page=0&pageSize=20000");
    const posts = await res.json();
    const content = posts.data.content;
    let paths=[];
    for(let i=0;i<content.length;i++){
      paths.push({params:{id: content[i].id.toString()}})
    }
    return {
      paths: paths,
      fallback: true  // See the "fallback" section below
    };
  }