import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { AuthShellPrimary } from '@/components/layouts/shells/auth-shell-primary';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { type GetServerSideProps } from 'next';
import { type NextPageWithLayout } from '../_app';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const Dashboard: NextPageWithLayout = () => {
    return (
        <AuthShellPrimary title='Dashboard' description='Welcome to your dashboard page.'>
            <h1>Dashboard Page</h1>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi asperiores nostrum reiciendis
                ducimus animi voluptatibus, qui nulla rerum! Eligendi dolores excepturi quos cum natus temporibus
                asperiores neque voluptatem aperiam illo optio magnam ea architecto porro dignissimos quibusdam numquam,
                possimus, debitis itaque earum. Vel, ipsa sed? Quas doloremque dignissimos rerum quasi ab fugiat ea
                deserunt adipisci voluptatibus, illo repellat maiores veritatis non iure et odit. Accusantium ipsam
                pariatur iste. Doloribus delectus, soluta, ex eligendi explicabo ad in, temporibus quam dolore magnam
                qui! Atque, asperiores nemo ut vel consequatur quae. Vitae impedit modi facere tempore deserunt possimus
                alias voluptatum consectetur dicta sit? Aspernatur perspiciatis ipsum odio, obcaecati debitis soluta
                nam! Enim optio harum amet dicta aliquam ratione porro odio quasi sequi accusantium, hic saepe
                voluptate. Tempora a quam est voluptate aut laborum iure maiores sunt modi voluptatem. Est sequi ad
                praesentium quas blanditiis impedit eos deserunt, repellendus doloremque ipsam incidunt quia architecto
                labore sed ex saepe inventore illum quidem. Ex numquam laborum quo delectus minima eveniet ducimus
                inventore aut sapiente sint odit incidunt deserunt amet quos exercitationem iure nemo beatae, laudantium
                accusantium reprehenderit dolor. Nesciunt itaque assumenda accusamus illum neque incidunt id corporis
                ipsam eius, ipsum inventore nihil? Explicabo maiores hic deserunt provident facere, reiciendis
                doloremque sed vero atque nam commodi molestiae, magnam error repudiandae dolores asperiores similique
                incidunt, iusto aliquid autem veniam maxime! Expedita ipsam, impedit error, illum iusto harum nostrum
                nulla laudantium nesciunt ducimus magni praesentium voluptates inventore omnis sequi, qui recusandae?
                Necessitatibus, laboriosam ea. Omnis ex nostrum quaerat dolore.
            </p>
        </AuthShellPrimary>
    );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Dashboard'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Dashboard;
