import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import FlexibleTable from "../../../Component/ui/Flexibletable";
import VoterProfilelayout from "../../../Layout/VoterProfilelayout";
import { USER_TRANSACTION_LIST } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";

const getTransactionId = (item) =>
  item?._id ||
  item?.transactionId ||
  item?.transaction?._id ||
  item?.paymentIntentId ||
  item?.id ||
  "N/A";


const getTransactionType = (item) =>
  item?.type || item?.transactionType ==="subscription" ? "Donation" : "N/A";

const getTransactionStatus = (item) =>
  item?.status || item?.paymentStatus || item?.transaction?.status || "N/A";

const getTransactionAmount = (item) => {
  
  const amount =
    item?.amount ??
    item?.transaction?.amount ??
    item?.paidAmount ??
    item?.applicationFee;
    const currency = item?.currency || item?.transaction?.currency || item?.currencySymbol || "USD";

  if (amount === undefined || amount === null || amount === "") {
    return "N/A";
  }

  const numericAmount = Number(amount);

  if (!Number.isNaN(numericAmount)) {
    if (typeof currency === "string" && currency.length === 3) {
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency.toUpperCase(),
        }).format(numericAmount);
      } catch (error) {
        return `${currency.toUpperCase()} ${numericAmount.toFixed(2)}`;
      }
    }

    return `${currency} ${numericAmount.toFixed(2)}`;
  }

  return `${currency} ${amount}`;
};

const getTransactionDate = (item) => {
  const date =
    item?.date_created_utc ||
    item?.createdAt ||
    item?.updatedAt ||
    item?.transaction?.createdAt;

  return date ? moment(date).format("DD MMM YYYY, hh:mm A") : "N/A";
};

const Transactions = () => {
  const [body, setBody] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 1,
    limit: 10,
  });

  const [totalCount, setTotalCount] = useState(0);

  const { data: transactions = [], isFetching, isLoading } = useQuery({
    queryKey: [
      "user-transaction-list",
      body.orderBy,
      body.order,
      body.page,
      body.limit,
    ],
    queryFn: async () => {
      const res = await USER_TRANSACTION_LIST(body);
      const success = checkResponse({ res, setTotal: setTotalCount });
      if (!success) {
        return [];
      }

      const payload = res?.data?.data;

      if (Array.isArray(payload)) {
        return payload;
      }

      return (
        payload?.data ||
        payload?.docs ||
        payload?.records ||
        payload?.items ||
        payload?.transactions ||
        []
      );
    },
    keepPreviousData: true,
  });


  console.log(totalCount)

  const columns = useMemo(
    () => [
      {
        key: "sr",
        title: "Sr",
        render: (_, row) => {
          const rowIndex = transactions.findIndex(
            (item) => getTransactionId(item) === getTransactionId(row),
          );
          const serialNumber =
            rowIndex >= 0 ? (body.page - 1) * body.limit + rowIndex + 1 : "-";

          return <span>{serialNumber}</span>;
        },
      },
      {
        key: "type",
        title: "Type",
        render: (_, row) => <span>{getTransactionType(row)}</span>,
      },
      {
        key: "amount",
        title: "Amount",
        render: (_, row) => <span>{getTransactionAmount(row)}</span>,
      },
      {
        key: "createdAt",
        title: "Date",
        render: (_, row) => <span>{getTransactionDate(row)}</span>,
      },
    ],
    [transactions, body.page, body.limit],
  );

  return (
    <section className="profilesettingpage p-3">
      <div className="  transactionsCard overflow-hidden">
        <div className="resumeCard_head p-3 gap-2 d-flex align-items-center justify-content-between">
          <h4 className="m-0 text-white">Donation List</h4>
          {(isLoading || isFetching) && <Spinner animation="border" size="sm" />}
        </div>

        <div className="p-3">
          <FlexibleTable
            className="transactionsTable"
            columns={columns}
            data={transactions}
            emptyMessage="No donations found"
            currentPage={body.page}
            setCurrentPage={(page) =>
              setBody((prev) => ({
                ...prev,
                page: typeof page === "function" ? page(prev.page) : page,
              }))
            }
            onPageSizeChange={(limit) =>
              setBody((prev) => ({
                ...prev,
                page: 1,
                limit,
              }))
            }
            pageSize={body.limit}
            totalItems={totalCount}
            totalPages={Math.ceil(totalCount / body.limit)}
            serverSidePagination
          />
        </div>
      </div>
    </section>
  );
};

export default Transactions;

Transactions.getLayout = function getLayout(page) {
  return <VoterProfilelayout>{page}</VoterProfilelayout>;
};
