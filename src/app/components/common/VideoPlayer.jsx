'use client';

import clsx from 'clsx';

import styles from '@/styles/components/common/VideoPlayer.module.scss';

const VideoPlayer = ({ className, src }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <iframe
        width="100%"
        height="100%"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
};

VideoPlayer.propTypes = {};

export default VideoPlayer;
