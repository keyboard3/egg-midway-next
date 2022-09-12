import type { NextPage, NextPageContext } from 'next';
declare const Home: NextPage;
export default Home;
export declare function getServerSideProps(context: NextPageContext): Promise<{
    props: {
        name: any;
    };
}>;
