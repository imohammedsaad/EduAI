const Footer = () => {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by{' '}
        <a
          href="https://www.anthropic.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Anthropic
        </a>
        .{' '}
        <a
          href="/terms"
          className="font-bold hover:underline"
        >
          Terms
        </a>
        {' '}&middot;{' '}
        <a
          href="/privacy"
          className="font-bold hover:underline"
        >
          Privacy
        </a>
      </p>
    </footer>
  );
}; 