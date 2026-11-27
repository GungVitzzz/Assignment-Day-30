import { Button } from "@/components/ui/button";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}
      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
}

export default Pagination;
