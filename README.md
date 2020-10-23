This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```



Helm Chart Install
NAME: minio-1603466827
LAST DEPLOYED: Fri Oct 23 17:27:09 2020
NAMESPACE: minio
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Minio can be accessed via port 9000 on the following DNS name from within your cluster:
minio-1603466827.minio.svc.cluster.local

To access Minio from localhost, run the below commands:

  1. export POD_NAME=$(kubectl get pods --namespace minio -l "release=minio-1603466827" -o jsonpath="{.items[0].metadata.name}")

  2. kubectl port-forward $POD_NAME 9000 --namespace minio

Read more about port forwarding here: http://kubernetes.io/docs/user-guide/kubectl/kubectl_port-forward/

You can now access Minio server on http://localhost:9000. Follow the below steps to connect to Minio server with mc client:

  1. Download the Minio mc client - https://docs.minio.io/docs/minio-client-quickstart-guide

  2. mc config host add minio-1603466827-local http://localhost:9000 4CPXpYgppzlHhQ3g7r_ZBo4pXxk6jnpw aCOqg-N5gZawYWe0HjM4rSTdVHhKZNMy S3v4

  3. mc ls minio-1603466827-local

Alternately, you can use your browser or the Minio SDK to access the server - https://docs.minio.io/categories/17