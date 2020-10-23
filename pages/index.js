import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Gallery from "react-photo-gallery"
import {useCallback, useState} from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function Home({images}) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Monica Larsen</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    MONICA LARSEN
                </h1>
                <h2>photographer</h2>
                <Gallery
                    photos={images}
                    onClick={openLightbox}
                />
                <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={images.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </main>

            <footer className={styles.footer}>
                <p>
                    About me
                    I regularly shoot images in the industrial sectors and for corporate business. I fell in love with visual art craft after working in an advertising agency. After living in London for almost 3 years working as a Photographer´s assistant I opened up my own studio in 2007 and have since then been shooting mostly advertising and editorial images for a wide range of clients, on location and in studio. I always aim to shoot images that connect emotionally with audiences. When it comes to post-production I do a lot of my own retouching, but I also work with some excellent retouching companies in Norway and abroad. I tailor the image exactly to what the client want to communicate so please feel free to contact me.   Tel +47-99229821
                </p>
            </footer>
        </div>
    )
}

export async function getStaticProps() {
    const Minio = require('minio')
    const minioClient = new Minio.Client({
        endPoint: 'minio.r6.no',
        useSSL: true,
        accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS,
        secretKey: process.env.MINIO_SECRET
    });

    const imagesPromise = new Promise((resolve, reject) => {
        const images = []
        minioClient.listObjects('monica')
            .on('data', obj => {
                minioClient.presignedGetObject("monica", obj.name, (err, presignedUrl) => {
                    if(err)
                        console.error(err)

                    images.push({
                        lastModified: obj.lastModified.toISOString(),
                        src: presignedUrl,
                        name: obj.name,
                        loading: 'lazy',
                        width: 1,
                        height: 1
                    })
                })
            })
            .on('error', err => reject(err))
            .on('end', () => resolve(images))
    })

    return {
        props: {
            images: await imagesPromise
        }
    }
}