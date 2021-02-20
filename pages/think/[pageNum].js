import React, { Component } from 'react';
import { Pagination } from 'antd';
import ThinkContent from '../../components/think/think-content';
import KnowMeLayout from '../../components/layout'; 
import { withRouter } from 'next/router';

class ThinkList extends Component {
  state = {
    //list: [{ title: '1', content: '1' }, { title: '2', content: '2' }, { title: '3', content: '3' }, { title: '4', content: '4' }],
    list:[],
    loading: false,
    // start 滚动加载
    hasMore: true,
    pageNum: 0,
    pageSize: 20,
    total: 0
    // end
  };
  onPageChange =(page, pageSize)=>{
      this.props.router.push("/think/"+(page).toString());
  }
  render() {
    if (this.props.router.isFallback) {
      return <KnowMeLayout><div>Loading......I'm sorry for the wait!!</div></KnowMeLayout>;
    }
    let ThinkContents = [];
    this.props.posts.data.content.forEach((element, index, array) => {
      ThinkContents.push(<ThinkContent element={element} key={index} loading={this.state.loading} />);
    });
    //this.props.router.query.pageNum
    //number
    return (
      <div>
        <KnowMeLayout>
            {ThinkContents}
          <Pagination showQuickJumper defaultCurrent={this.props.router.query.pageNum} total={this.props.posts.data.totalElements}
           defaultPageSize={20} showSizeChanger={false} onChange={this.onPageChange}/>
        </KnowMeLayout>
      </div>
    );
  }
}
export default withRouter(ThinkList);

export async function getStaticProps({params }) {
  console.log("params---------",params)
  const res = await fetch("https://ximouzhao.com/api/document/findByPageAndType?type=THINK&page="
  +(params.pageNum-1)+
  "&pageSize=20");
  const posts = await res.json();
  return {
    props: {posts},
    revalidate: 1, // In seconds
  }
}
export async function getStaticPaths() {
  const res = await fetch("http://home.ximouzhao.com:1998/api/document/findByPageAndType?type=THINK&page=0&pageSize=20");
  const posts = await res.json();
  const totalPages = posts.data.totalPages;
  let paths=[];
  for(let i=1;i<totalPages+1;i++){
    paths.push({params:{pageNum: i.toString()}})
  }
  return {
    paths: paths,
    fallback: true  // See the "fallback" section below
  };
}